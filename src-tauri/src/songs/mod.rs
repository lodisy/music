pub mod model;

// use anyhow::{Ok, Result};
// use reqwest::{
//     header::{HeaderMap, HeaderValue},
//     Client,
// };

// use std::collections::HashMap;

// const API_URL: &str = "https://music.163.com";

// const LINUX_USER_AGNET: &str =
//     "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36";

// const USER_AGENT_LIST: [&str; 14] = [
//     "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1",
//     "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1",
//     "Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Mobile Safari/537.36",
//     "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Mobile Safari/537.36",
//     "Mozilla/5.0 (Linux; Android 5.1.1; Nexus 6 Build/LYZ28E) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Mobile Safari/537.36",
//     "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_2 like Mac OS X) AppleWebKit/603.2.4 (KHTML, like Gecko) Mobile/14F89;GameHelper",
//     "Mozilla/5.0 (iPhone; CPU iPhone OS 10_0 like Mac OS X) AppleWebKit/602.1.38 (KHTML, like Gecko) Version/10.0 Mobile/14A300 Safari/602.1",
//     "Mozilla/5.0 (iPad; CPU OS 10_0 like Mac OS X) AppleWebKit/602.1.38 (KHTML, like Gecko) Version/10.0 Mobile/14A300 Safari/602.1",
//     "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:46.0) Gecko/20100101 Firefox/46.0",
//     "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36",
//     "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/603.2.4 (KHTML, like Gecko) Version/10.1.1 Safari/603.2.4",
//     "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:46.0) Gecko/20100101 Firefox/46.0",
//     "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36",
//     "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/13.1058",
// ];

// #[allow(unused)]
// #[derive(Clone, Copy, Debug)]
// pub enum Method {
//     Post,
//     Get,
// }

// #[allow(unused)]
// #[derive(Clone, Copy)]
// enum CryptoApi {
//     Weapi,
//     Linuxapi,
// }

// pub struct Api {
//     client: Client,
// }

// impl Api {
//     pub fn new() -> Self {
//         Self {
//             client: Client::new(),
//         }
//     }

//     pub async fn request(
//         &mut self,
//         method: Method,
//         url: &str,
//         params: HashMap<&str, &str>,
//         user_agent: &str,
//         cryptoapi: CryptoApi,
//     ) -> Result<String> {
//         let mut url = format!("{}{}", API_URL, url);

//         match method {
//             Method::Get => Ok(self.client.get(&url).send().await?.text().await?),
//             Method::Post => {
//                 let ua = match cryptoapi {
//                     CryptoApi::Linuxapi => LINUX_USER_AGNET.to_string(),
//                     CryptoApi::Weapi => choose_user_agent(user_agent).to_string(),
//                 };

//                 let body = match cryptoapi {
//                     CryptoApi::Linuxapi => {
//                         let data = format!(
//                             r#"{{"method":"linuxapi","url":"{}","params":{}}}"#,
//                             url.replace("weapi", "api"),
//                             // QueryParams::from_map(params).json()
//                             serde_json::to_string(&params).unwrap()
//                         );
//                         url = "https://music.163.com/api/linux/forward".to_owned();
//                         // Crypto::linuxapi(&data) // TODO

//                         data
//                     }
//                     CryptoApi::Weapi => {
//                         //todo
//                         // let mut params = params;
//                         // params.insert("csrf_token", &self.csrf[..]);
//                         // let text = serde_json::to_string(&params)?;
//                         // Crypto::weapi(&text)
//                         "".to_owned()
//                     }
//                 };

//                 let mut headers = HeaderMap::new();
//                 headers.insert(
//                     "Cookie",
//                     HeaderValue::from_static("os=pc; appver=2.7.1.198277"),
//                 );
//                 headers.insert("User-Agent", HeaderValue::from_str(&ua)?);
//                 headers.insert("Referer", HeaderValue::from_static("https://music.163.com"));
//                 headers.insert("Host", HeaderValue::from_static("music.163.com"));
//                 headers.insert("Origin", HeaderValue::from_static("https://music.163.com"));
//                 headers.insert("Connection", HeaderValue::from_static("keep-alive"));
//                 headers.insert("Accept", HeaderValue::from_static("*/*"));
//                 headers.insert(
//                     "Content-Type",
//                     HeaderValue::from_static("application/x-www-form-urlencoded"),
//                 );
//                 headers.insert(
//                     "Accept-Language",
//                     HeaderValue::from_static("en-US,en;q=0.9,zh;q=0.8"),
//                 );
//                 headers.insert("Accept-Encoding", HeaderValue::from_static("gzip, deflate"));
//                 let client = reqwest::Client::builder()
//                     .default_headers(headers)
//                     .build()?;

//                 return Ok(client.post(&url).body(body).send().await?.text().await?);
//             }
//         }
//     }
// }

// fn choose_user_agent(ua: &str) -> &str {
//     let index = if ua == "mobile" {
//         rand::random::<usize>() % 7
//     } else if ua == "pc" {
//         rand::random::<usize>() % 5 + 8
//     } else if ua.is_empty() {
//         rand::random::<usize>() % USER_AGENT_LIST.len()
//     } else {
//         return ua;
//     };
//     USER_AGENT_LIST[index]
// }
