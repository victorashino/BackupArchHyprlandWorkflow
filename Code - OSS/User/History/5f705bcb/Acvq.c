#include <stdio.h>

struct novo_tipo {
  int dado;
  float valor;
};

int main() {

  int i;
  int j;
  int vetor[5] = {10, 20, 30, 40, 50};
  int matriz[3][3] = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};

  //   for (i = 0; i < 5; i++) {
  //     printf("%d\n", vet[i]);
  //   }

  for (i = 0; i < 3; i++) {
    for (j = 0; j < 3; j++) {
      printf("%d ", matriz[i][j]);
    }
    printf("\n");
  }

  struct novo_tipo variavel;

  variavel.dado = 10;
}
