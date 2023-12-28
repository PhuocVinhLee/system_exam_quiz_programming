#include<stdio.h> 
int max(int a, int b){
if(a>b) return a;
  return b;
}
int max3(int a, int b, int c) 
 {return max(max(a,b), c);
 } 
int main() { 
printf("%d", max3(-4, 1,5));
return 0;  
}  
