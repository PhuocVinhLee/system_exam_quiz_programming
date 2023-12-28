#include<stdio.h> 
int max(int a, int b){
if(a>b) return a;
  return b;
}
int max3(int a, int b, int c) 
 {return max(max(a,b), c);
 } 
int main() { 
printf("%d", mqx3(-8, 1, 5));
return 0;  
}  
