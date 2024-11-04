#include <iostream>
#include <unistd.h>  // Para a função sleep()
#include <string>
#include <cstdio>    // Para system("clear")

// void clear_screen() {
//     std::cout << "\033[2J\033[1;1H";  // ANSI escape codes para limpar a tela
// }

int main() {
    const int width = 50;  // Largura da tela
    const char symbol = '.';  // Símbolo da animação
    int position = 0;

    while (true) {
        // clear_screen();
        std::string frame(width, ' ');
        frame[position] = symbol;
        std::cout << frame << std::endl;
        usleep(90000);  // Pausa por 100 milissegundos
        position = (position + 1) % width;  // Move o símbolo
    }

    return 0;
}
