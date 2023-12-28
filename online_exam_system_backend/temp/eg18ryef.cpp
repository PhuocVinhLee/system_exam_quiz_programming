#include<stdio.h> 
int max(int a, int b){
  if(a>b) return a;
  return b;
}
int max3(int a, int b, int c) 
 { return max(max(a,b),c);
 } 
int main() { 
printf("%d", max3(-5, 1,4));
return 0;  
}  
