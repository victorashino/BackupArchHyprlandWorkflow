#include <ncurses.h>
#include <unistd.h>
#include <vector>
#include <cstdlib>
#include <algorithm>

using namespace std;

// Configurações do jogo
const int WIDTH = 20;
const int HEIGHT = 10;
const char SNAKE_CHAR = '#';
const char FOOD_CHAR = '*';

enum Direction { STOP = 0, LEFT, RIGHT, UP, DOWN };
Direction dir;

class SnakeGame {
    vector<pair<int, int>> snake;
    pair<int, int> food;
    bool gameOver;

public:
    SnakeGame() {
        initscr();
        cbreak();
        noecho();
        curs_set(0);
        keypad(stdscr, TRUE);
        nodelay(stdscr, TRUE);

        dir = STOP;
        gameOver = false;

        // Inicializa a cobra e a comida
        snake.push_back({ HEIGHT / 2, WIDTH / 2 });
        food = { rand() % HEIGHT, rand() % WIDTH };
    }

    ~SnakeGame() {
        endwin();
    }

    void Draw() {
        clear();
        for (auto segment : snake) {
            mvprintw(segment.first, segment.second, "%c", SNAKE_CHAR);
        }
        mvprintw(food.first, food.second, "%c", FOOD_CHAR);
        refresh();
    }

    void Input() {
        int ch = getch();
        switch (ch) {
            case KEY_LEFT:
                if (dir != RIGHT) dir = LEFT;
                break;
            case KEY_RIGHT:
                if (dir != LEFT) dir = RIGHT;
                break;
            case KEY_UP:
                if (dir != DOWN) dir = UP;
                break;
            case KEY_DOWN:
                if (dir != UP) dir = DOWN;
                break;
            case 'q':
                gameOver = true;
                break;
        }
    }

    void Logic() {
        if (gameOver) return;

        pair<int, int> head = snake.front();
        switch (dir) {
            case LEFT:  head.second--; break;
            case RIGHT: head.second++; break;
            case UP:    head.first--; break;
            case DOWN:  head.first++; break;
            default: break;
        }

        if (head.first < 0 || head.first >= HEIGHT || head.second < 0 || head.second >= WIDTH || find(snake.begin(), snake.end(), head) != snake.end()) {
            gameOver = true;
            return;
        }

        if (head == food) {
            food = { rand() % HEIGHT, rand() % WIDTH };
        } else {
            snake.pop_back();
        }

        snake.insert(snake.begin(), head);
    }

    bool IsGameOver() const {
        return gameOver;
    }

    void Run() {
        while (!IsGameOver()) {
            Draw();
            Input();
            Logic();
            usleep(200000);  // Aumente o delay para desacelerar o jogo
        }

        // Exibe uma mensagem final antes de fechar
        clear();
        mvprintw(HEIGHT / 2, WIDTH / 2 - 5, "Game Over!");
        refresh();
        sleep(3);  // Pausa de 3 segundos antes de sair
    }
};

int main() {
    SnakeGame game;
    game.Run();
    return 0;
}
