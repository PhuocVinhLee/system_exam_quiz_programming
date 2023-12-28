#include<stdio.h> 
int add(int b) {
  int sum = b+b;
  return sum;
}
int main() { 
int a = 2;
int test; 
test = add(a); 
printf("%d", test); 
return 0;  
}  
