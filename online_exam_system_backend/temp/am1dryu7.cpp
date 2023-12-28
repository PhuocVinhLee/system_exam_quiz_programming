#include<stdio.h> 
int max3(int a, int b, int c) 
 { return max(max(a,b),c);
 } 
int main() { 
printf("%d", max3(-8, 1,3));
return 0;  
}  
