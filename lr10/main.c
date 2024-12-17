#include <windows.h>
#include <stdio.h>

// Определяем функции, которые будем использовать из DLL
typedef void (*save_text_func)(const char*);
typedef const char* (*read_text_func)();

int main() {
    // Загрузка DLL
    HINSTANCE hDll = LoadLibrary("textdll.dll");
    if (!hDll) {
        printf("Failed to load the DLL\n");
        return 1;
    }

    // Получение указателей на функции
    save_text_func save_text = (save_text_func)GetProcAddress(hDll, "save_text");
    read_text_func read_text = (read_text_func)GetProcAddress(hDll, "read_text");

    if (!save_text || !read_text) {
        printf("Failed to get function addresses\n");
        FreeLibrary(hDll);
        return 1;
    }

    // Сохранение текста в DLL
    save_text("Hello from the first process!");

    // Чтение текста из DLL
    const char* text = read_text();
    printf("Text read from the DLL: %s\n", text);

    // Освобождение DLL
    FreeLibrary(hDll);
    return 0;
}
