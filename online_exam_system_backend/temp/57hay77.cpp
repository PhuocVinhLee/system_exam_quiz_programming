#include<stdio.h>  
  
int add(int x, int y)  
{  
    return(x+y);  
}   
  
int main()  
{  
    int a, b;  
  
  
    scanf("%d%d", &a, &b);  
  
    //function call add(a, b);  
    printf("%d", a, b, add(a, b));  
  
    return 0;  
}  