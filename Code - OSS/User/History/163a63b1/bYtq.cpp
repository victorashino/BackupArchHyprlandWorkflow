#include <iostream>

using namespace std;

void incrementNumber(int *number)

int main() {
    int number;
    cout << "Digite um numero: ";
    cin >> number;
    incrementNumber(*number)
    cout << number << "\n";
    cout << "Victor" << "\n";
    return 0;
}

void incrementNumber(int *number) {
    *number++
}