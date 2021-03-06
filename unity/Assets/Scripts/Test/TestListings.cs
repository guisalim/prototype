using System;
using UnityEngine;
using UnityEngine.Replay;
using UnityEngine.Networking;
using System.Collections;
using UnityEngine.UI;
using UnityEngine.EventSystems;

namespace Unity.Metacast.Demo
{
    /// <summary>
    ///     Populate UIBrowser with test json data
    /// </summary>
    public class TestListings : MonoBehaviour
    {
        private string url = "http://localhost:3000/api/games/?premium=";
        private int premium = 1;
        [SerializeField] private TextAsset m_TestJson;
        [SerializeField] private Button MyButton;

        /// <summary>
        ///     Start is called on the frame when a script is enabled just
        ///     before any of the Update methods are called the first time.
        /// </summary>
        private void Start()
        {
            MyButton?.onClick.AddListener(() => { ToggleList(); });
            ToggleList();
        }

        /// <summary>
        ///     This function will be resposible for toggle between premium 
        ///     and public content. It will be called when feature start
        ///     allowing a setup of the button used
        /// </summary>
        public void ToggleList()
        {
            MyButton.interactable = false;
            var colors = MyButton.colors;

            switch (premium)
            {
                case 0:
                    colors.normalColor = Color.blue;
                    MyButton.gameObject.GetComponentInChildren<Text>().text = "View Public";
                    premium = 1;
                    break;
                case 1:
                    colors.normalColor = Color.red;
                    MyButton.gameObject.GetComponentInChildren<Text>().text = "View Premium";
                    premium = 0;
                    break;
            }
            MyButton.colors = colors;
            StartCoroutine(GetRequest(url + premium));
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

                UIBrowser.instance.Reset(text);
                MyButton.interactable = true;
            }
        }
    }
}