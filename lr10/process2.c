#include <windows.h>
#include <stdio.h>

typedef const char* (*read_text_func)();

int main() {
    // Загрузка DLL
    HINSTANCE hDll = LoadLibrary("textdll.dll");
    if (!hDll) {
        printf("Failed to load the DLL\n");
        return 1;
    }

    // Получение указателя на функцию чтения
    read_text_func read_text = (read_text_func)GetProcAddress(hDll, "read_text");

    if (!read_text) {
        printf("Failed to get the function address\n");
        FreeLibrary(hDll);
        return 1;
    }

    // Чтение текста из DLL
    const char* text = read_text();
    printf("Text read from the DLL in the second process: %s\n", text);

    // Освобождение DLL
    FreeLibrary(hDll);
    return 0;
}
