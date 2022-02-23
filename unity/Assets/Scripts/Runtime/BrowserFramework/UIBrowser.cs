using System.Collections;
using System.Collections.Generic;
using System.Linq;
using UnityEngine;
using UnityEngine.Networking;

namespace UnityEngine.Replay
{
    /// <summary>
    ///     The top level browser for managing carousels and listings
    /// </summary>
    public class UIBrowser : MonoBehaviour
    {
        public static UIBrowser instance { get; private set; }

        [SerializeField]
        public GameObject CustomCarousel;
        public GameObject Content;
        public GameObject ButtonToggle;

        /// <summary>
        ///  Awake is called when the script instance is being loaded.
        /// </summary>
        private void Awake()
        {
            instance = this;
        }

        /// <summary>
        ///     Reset is called when we want to RESET the list of categories
        ///     base on the new json received.
        /// </summary>
        /// <param name="jsonString">The JSON string to parse</param>
        public void Reset(string jsonString)
        {
            foreach (Transform child in Content.transform)
            {
                GameObject.Destroy(child.gameObject);
            }
            StartCoroutine(CreateListings(jsonString));
        }

        /// <summary>
        ///     Creates the listings from a JSON string
        /// </summary>
        /// <param name="jsonString">The JSON string to parse</param>
        private IEnumerator CreateListings(string jsonString)
        {
            ListingsContainer allListings = JsonUtility.FromJson<ListingsContainer>(jsonString);
            List<Listing> listings = new List<Listing>();

            // We'll create a dictionary as soft reference to cache images that will be loaded
            // from URLs. It will help us reduce the amount of request to external sources
            // and increase our loading experience for the Unity user
            Dictionary<string, Texture2D> imageCache = new Dictionary<string, Texture2D>();

            foreach (Listing listing in allListings.listings)
            {
                for (int i = 0; i < listing.images.Length; i++)
                {
                    var imageObject = listing.images[i];

                    // If the texture exists in the cache dictionary, we can reuse the same texture
                    // Otherwise, we download from the source and store in the Dictionary
                    if (imageCache.ContainsKey(imageObject.url))
                    {
                        listing.images[i].texture = imageCache[imageObject.url];
                        listing.images[i].isLoaded = true;
                    }
                    else
                    {
                        using (UnityWebRequest uwr = UnityWebRequestTexture.GetTexture(imageObject.url))
                        {
                            yield return uwr.SendWebRequest();

                            if (uwr.result == UnityWebRequest.Result.Success)
                            {
                                var texture = DownloadHandlerTexture.GetContent(uwr);
                                listing.images[i].texture = texture;
                                listing.images[i].isLoaded = true;
                                imageCache.Add(imageObject.url, texture);
                            }
                        }
                    }
                }
                listings.Add(listing);
            }

            // Once all images are loaded, we can create the Carousels
            SetCarousels(listings);
        }

        /// <summary>
        ///     SetCarousels will be responsible for creating all Content
        ///     Carousels based on the listing received
        /// </summary>
        /// <param name="listings">a lists of games</param>
        private void SetCarousels(List<Listing> listings)
        {
            var carousels = listings
                            .OrderBy(a => a.updatedAt)
                            .GroupBy(game => game.category)
                            .Select((g, i) => (new
                            {
                                name = g.Key,
                                listings = g.ToList()
                            }, i));

            var postContent = Content.transform.position;
            var paddingBottom = 50;
            foreach (var (category, index) in carousels)
            {
                var NewCarousel = Instantiate(CustomCarousel, new Vector3(0, 0, 0), Quaternion.identity, Content.transform);
                NewCarousel.name = category.name;
                NewCarousel.transform.localScale = new Vector3(1, 1, 1);

                RectTransform rt = (RectTransform)NewCarousel.transform;
                RectTransform contentCurrentRt = (RectTransform)Content.transform;
                Content.GetComponent<RectTransform>().sizeDelta = new Vector2(0, contentCurrentRt.rect.height + rt.rect.height + paddingBottom);

                NewCarousel.transform.localPosition = new Vector3(0, 0 - ((rt.rect.height + paddingBottom) * index), 0);

                var carousel = Content.transform.Find(category.name).gameObject;
                carousel.GetComponent<UICarousel>().Init(category.name, category.listings);
            }
        }
    }
}
