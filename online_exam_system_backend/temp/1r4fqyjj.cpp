#include<stdio.h> 
int add(int a){
    int sum;
    sum = a + a;
    return sum;
}
int main() { 
int a = 6;
int test; 
test = add(a); 
printf("%d", test); 
return 0;  
}  
