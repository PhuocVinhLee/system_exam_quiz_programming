#include<stdio.h> 
int add(int b) {
  int sum = b+b;
  return sum;
}
int main() { 
int a = 3;
int test; 
test = add(a); 
printf("%d", test); 
return 0;  
}  
