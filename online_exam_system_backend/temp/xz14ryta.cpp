#include<stdio.h> 
int max(int a, int b){
  if(a>b) return a;
  return b;
}
int max3(int a, int b, int c) 
 { return max(max(a,b),c);
 } 
int main() { 
printf("%d", max3(-8, 1,3));
return 0;  
}  
