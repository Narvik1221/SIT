class Node:
    def __init__(self, name, age):
        self.name = name.ljust(8)[:8]  # Убедимся, что имя длиной 8 символов
        self.age = age
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None

    def insert(self, name, age):
        new_node = Node(name, age)
        
        # Если список пуст или новый элемент меньше головы
        if self.head is None or new_node.name < self.head.name:
            new_node.next = self.head
            self.head = new_node
            return

        # Поиск места для вставки
        current = self.head
        while current.next and current.next.name < new_node.name:
            current = current.next

        # Вставляем новый узел
        new_node.next = current.next
        current.next = new_node

    def delete(self, name):
        name = name.ljust(8)[:8]  # Убедимся, что имя длиной 8 символов

        # Если список пуст
        if self.head is None:
            print("Список пуст, удаление невозможно.")
            return

        # Если нужно удалить голову
        if self.head.name == name:
            self.head = self.head.next
            print(f"Элемент с именем '{name.strip()}' удалён.")
            return

        # Поиск узла для удаления
        current = self.head
        while current.next and current.next.name != name:
            current = current.next

        # Если элемент не найден
        if current.next is None:
            print(f"Элемент с именем '{name.strip()}' не найден.")
            return

        # Удаляем элемент
        current.next = current.next.next
        print(f"Элемент с именем '{name.strip()}' удалён.")

    def display(self):
        if self.head is None:
            print("Список пуст.")
            return

        current = self.head
        print("Список элементов:")
        while current:
            print(f"Имя: {current.name.strip()}, Возраст: {current.age}")
            current = current.next
        input("\nНажмите Enter для возврата в меню.")

if __name__ == "__main__":
    linked_list = LinkedList()

    while True:
        print("\nВыберите действие:")
        print("1. Добавить элемент")
        print("2. Удалить элемент")
        print("3. Показать список")
        print("4. Выход")

        choice = input("Введите номер действия: ")

        if choice == "1":
            name = input("Введите имя (до 8 символов): ")
            age = int(input("Введите возраст (1 байт, от 0 до 255): "))
            if 0 <= age <= 255:
                linked_list.insert(name, age)
                print("Элемент добавлен.")
            else:
                print("Возраст должен быть в диапазоне от 0 до 255.")

        elif choice == "2":
            name = input("Введите имя элемента для удаления: ")
            linked_list.delete(name)

        elif choice == "3":
            linked_list.display()

        elif choice == "4":
            print("Выход из программы.")
            break

        else:
            print("Неверный выбор, попробуйте снова.")
