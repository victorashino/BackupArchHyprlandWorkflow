#include <iostream>
#include <cmath>
#include <unistd.h>  // Para a função usleep()
#include <cstdlib>   // Para a função system()

void clear_screen() {
    std::cout << "\033[2J\033[1;1H";  // ANSI escape codes para limpar a tela
}

void draw_donut(float angle) {
    const int width = 40;
    const int height = 20;
    const char donut_char = 'o';
    const char empty_char = ' ';
    
    char screen[height][width];
    
    // Limpa a tela com espaços
    for (int y = 0; y < height; ++y) {
        for (int x = 0; x < width; ++x) {
            screen[y][x] = empty_char;
        }
    }
    
    float cx = width / 2.0;
    float cy = height / 2.0;
    float r = 8.0;  // Raio da rosquinha

    for (float t = 0; t < 2 * M_PI; t += 0.1) {
        float x = r * cos(t + angle);
        float y = r * sin(t + angle);
        int px = static_cast<int>(cx + x);
        int py = static_cast<int>(cy + y);

        if (px >= 0 && px < width && py >= 0 && py < height) {
            screen[py][px] = donut_char;
        }
    }

    for (int y = 0; y < height; ++y) {
        for (int x = 0; x < width; ++x) {
            std::cout << screen[y][x];
        }
        std::cout << std::endl;
    }
}

int main() {
    float angle = 0.0;
    
    while (true) {
        clear_screen();
        draw_donut(angle);
        usleep(100000);  // Pausa por 100 milissegundos
        angle += 0.1;
    }
    
    return 0;
}
