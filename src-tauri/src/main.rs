#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

pub mod todo;

use pocketbase_sdk::client::Client;
use todo::Todo;

#[tauri::command]
async fn get_todos(_app: tauri::AppHandle) -> Result<String, String> {
    let todos = [
        Todo::parse(&String::from(
            "x A 2022-05-01 Some content at @place and +project",
        )),
        Todo::parse(&String::from(
            "A 2022-05-01 Some other content at @otherPlace and +otherProject",
        )),
    ];
    Ok(serde_json::to_string(&todos).unwrap())
}

fn main() {
    /* Authenticate Client */
    let authenticated_client = Client::new("http://localhost:8090")
        .auth_with_password("users", "s@subbu.dev", "qwe123qwe123")
        .unwrap();

    dbg!(authenticated_client.health_check().unwrap().message);

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_todos])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
