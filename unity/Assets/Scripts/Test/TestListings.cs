using System;
using UnityEngine;
using UnityEngine.Replay;
using UnityEngine.Networking;
using System.Collections;

namespace Unity.Metacast.Demo
{
    /// <summary>
    ///     Populate UIBrowser with test json data
    /// </summary>
    public class TestListings : MonoBehaviour
    {
        private string url = "http://localhost:3000/api/games/list";
        [SerializeField] private TextAsset m_TestJson;

        /// <summary>
        ///     Start is called on the frame when a script is enabled just
        ///     before any of the Update methods are called the first time.
        /// </summary>
        private void Start()
        {
            //TODO Instead of a TextAsset pass JSON result from the web server.
            // UIBrowser.instance.Init(m_TestJson.text);
            StartCoroutine(GetRequest(url));
        }

        /// <summary>
        ///     Perform the request operation to fetch the content from the URL in use
        ///     Once the request is done, the visual is built with the stringfied json
        /// </summary>
        IEnumerator GetRequest(string url)
        {
            using (UnityWebRequest webRequest = UnityWebRequest.Get(url))
            {
                yield return webRequest.SendWebRequest();

                string[] pages = url.Split('/');
                int page = pages.Length - 1;
                string method = pages[page];
                string text = null;

                switch (webRequest.result)
                {
                    case UnityWebRequest.Result.ConnectionError:
                    case UnityWebRequest.Result.DataProcessingError:
                        Debug.LogError(method + ": Error: " + webRequest.error);
                        break;
                    case UnityWebRequest.Result.ProtocolError:
                        Debug.LogError(method + ": HTTP Error: " + webRequest.error);
                        break;
                    case UnityWebRequest.Result.Success:
                        text = webRequest.downloadHandler.text;
                        break;
                }

                UIBrowser.instance.Init(text);
            }
        }
    }
}