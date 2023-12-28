#include<stdio.h> 
int add(int a, int b){
    int sum;
    sum = a + b;
    return sum;
}
int main() { 
int a = 3; int b = 2;
int test; 
test = add(a); 
printf("%d", test); 
return 0;  
}  
