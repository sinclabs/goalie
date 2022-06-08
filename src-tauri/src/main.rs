#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

pub mod todo;

use todo::Todo;

#[tauri::command]
async fn get_todos(app: tauri::AppHandle) -> Result<String, String> {
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
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_todos])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
