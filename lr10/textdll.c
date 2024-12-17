#include <windows.h>
#include <stdio.h>

#define EXPORT __declspec(dllexport)

// Хранилище текста, доступное между вызовами
static char stored_text[1024] = {0};

// Функция для записи текста
EXPORT void save_text(const char* text) {
    strncpy(stored_text, text, sizeof(stored_text) - 1);
    stored_text[sizeof(stored_text) - 1] = '\0';  // Гарантируем нуль-терминатор
}

// Функция для чтения текста
EXPORT const char* read_text() {
    return stored_text;
}

// Логирование подключения процесса
BOOL APIENTRY DllMain(HMODULE hModule, DWORD ul_reason_for_call, LPVOID lpReserved) {
    switch (ul_reason_for_call) {
        case DLL_PROCESS_ATTACH:
            printf("A process attached to the DLL\n"); // Сообщение при подключении
            break;
        case DLL_PROCESS_DETACH:
            printf("A process detached from the DLL\n"); // Сообщение при отключении
            break;
    }
    return TRUE;
}
