#include<stdio.h> 
void add1(int a,int b)
{
   int c;
   c=a+b;
   printf("\nAddition:%d",c);
}

void add(int a,int b)
{
   int c;
  add1();
   c=a+b;
   printf("\nAddition:%d",c);
}
int main() { 
printf("%d", add(-5, 1));
return 0;  
}  
