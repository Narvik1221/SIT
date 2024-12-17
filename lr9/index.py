class Node:
    def __init__(self, name, age):
        # Инициализация узла списка
        # Поле имени обрезается или дополняется до длины 8 символов
        self.name = name.ljust(8)[:8]
        # Поле возраста (один байт, значение от 0 до 255)
        self.age = age
        # Указатель на следующий элемент (4-байтовое поле)
        self.next = None

    def __repr__(self):
        # Представление узла в виде строки для отладки
        next_addr = id(self.next) if self.next else None  # Получаем адрес следующего узла или None
        return f"Node(name='{self.name.strip()}', age={self.age}, next={next_addr})"


class LinkedList:
    def __init__(self):
        # Инициализация связанного списка, начально он пустой
        self.head = None

    def insert(self, name, age):
        # Вставка нового элемента в список с сохранением алфавитного порядка
        new_node = Node(name, age)  # Создаем новый узел

        # Если список пуст или новый элемент меньше головы
        if self.head is None or new_node.name < self.head.name:
            new_node.next = self.head  # Новый узел указывает на текущую голову
            self.head = new_node  # Новый узел становится головой списка
            return

        # Поиск места для вставки нового элемента
        current = self.head
        while current.next and current.next.name < new_node.name:
            current = current.next  # Переходим к следующему узлу

        # Вставляем новый узел в найденное место
        new_node.next = current.next  # Новый узел указывает на следующий элемент
        current.next = new_node  # Текущий узел указывает на новый узел

    def delete(self, name):
        # Удаление элемента из списка по имени
        name = name.ljust(8)[:8]  # Обрезаем или дополняем имя до длины 8 символов

        # Проверяем, пуст ли список
        if self.head is None:
            print("Список пуст, удаление невозможно.")
            return

        # Если удаляемый элемент - это голова списка
        if self.head.name == name:
            self.head = self.head.next  # Голова списка сдвигается на следующий элемент
            print(f"Элемент с именем '{name.strip()}' удалён.")
            return

        # Поиск узла, предшествующего удаляемому
        current = self.head
        while current.next and current.next.name != name:
            current = current.next  # Переходим к следующему узлу

        # Если элемент не найден
        if current.next is None:
            print(f"Элемент с именем '{name.strip()}' не найден.")
            return

        # Удаляем элемент, перенаправляя указатель next
        current.next = current.next.next
        print(f"Элемент с именем '{name.strip()}' удалён.")

    def display(self):
        # Вывод списка на экран
        if self.head is None:
            print("Список пуст.")
            return

        # Проходим по всем элементам списка
        current = self.head
        print("Список элементов:")
        while current:
            # Получаем адрес следующего узла или None
            next_addr = id(current.next) if current.next else None
            # Выводим информацию об узле
            print(
                f"Имя: {current.name.strip()}, Возраст: {current.age}, "
                f"Адрес следующего: {next_addr}"
            )
            current = current.next  # Переходим к следующему узлу
        input("\nНажмите Enter для возврата в меню.")


if __name__ == "__main__":
    # Основная программа для взаимодействия с пользователем
    linked_list = LinkedList()  # Создаем пустой связанный список

    while True:
        # Меню действий
        print("\nВыберите действие:")
        print("1. Добавить элемент")
        print("2. Удалить элемент")
        print("3. Показать список")
        print("4. Выход")

        choice = input("Введите номер действия: ")

        if choice == "1":
            # Добавление элемента в список
            name = input("Введите имя (до 8 символов): ")
            age = int(input("Введите возраст (1 байт, от 0 до 255): "))
            if 0 <= age <= 255:
                linked_list.insert(name, age)  # Вставка элемента
                print("Элемент добавлен.")
            else:
                print("Возраст должен быть в диапазоне от 0 до 255.")

        elif choice == "2":
            # Удаление элемента из списка
            name = input("Введите имя элемента для удаления: ")
            linked_list.delete(name)

        elif choice == "3":
            # Вывод списка
            linked_list.display()

        elif choice == "4":
            # Выход из программы
            print("Выход из программы.")
            break

        else:
            # Неверный выбор
            print("Неверный выбор, попробуйте снова.")
