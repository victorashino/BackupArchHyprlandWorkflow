#include <iostream>
#include <cmath>
#include <unistd.h>  // Para a função usleep()
#include <cstring>   // Para a função memset()

void clear_screen() {
    std::cout << "\033[2J\033[1;1H";  // ANSI escape codes para limpar a tela
}

void gotoxy(int x, int y) {
    std::cout << "\033[" << y << ";" << x << "H";
}

int main() {
    float A = 0, B = 0;
    float i, j;
    int k;
    float z[1760];
    char b[1760];
    
    clear_screen();
    
    while (true) {
        memset(b, 32, 1760);
        memset(z, 0, sizeof(z));

        for (j = 0; j < 6.28; j += 0.07) {
            for (i = 0; i < 6.28; i += 0.02) {
                float c = sin(i); // sin(phi)
                float d = cos(j); // cos(theta)
                float e = sin(A); // sin(A)
                float f = sin(j); // sin(theta)
                float g = cos(A); // cos(A)
                float h = d + 2;  // (R2 + R1cos(theta)) // R2 is 2 here
                float D = 1 / (c * h * e + f * g + 5); // 1/(z + K2) // K2 is 5
                float l = cos(i); // cos(phi)
                float m = cos(B); // cos(B)
                float n = sin(B); // sin(B)
                float t = c * h * g - f * e;
                int x = 40 + 30 * D * (l * h * m - t * n);
                int y = 12 + 15 * D * (l * h * n + t * m);
                int o = x + 80 * y;
                int N = 8 * ((f * e - c * d * g) * m - c * d * e - f * g - l * d * n);

                if (22 > y && y > 0 && x > 0 && 80 > x && D > z[o]) {
                    z[o] = D;
                    b[o] = ".,-~:;=!*#$@"[N > 0 ? N : 0];
                }
            }
        }

        gotoxy(0, 0);
        for (k = 0; k < 1761; k++) {
            putchar(k % 80 ? b[k] : 10);
        }

        A += 0.04;
        B += 0.02;
        usleep(100000); // Pausa por 100 milissegundos
    }

    return 0;
}
