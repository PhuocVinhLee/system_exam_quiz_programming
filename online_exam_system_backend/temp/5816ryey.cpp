#include<stdio.h> 
int max3(int a, int b, int c) 
 { return max(max(a,b),c);
 } 
int main() { 
printf("%d", max3(-4, 1,6));
return 0;  
}  
