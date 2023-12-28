#include<stdio.h>  
  
int add(int x, int y)  
{  
    return(x+y);  
}  

  
int main()  
{  
    int a, b;  
  
    printf("Enter 2 integer numbers\n");  
    scanf("%d%d", &a, &b);  
  
    //function call add(a, b);  
    printf("%d",add(a, b));  
  
    return 0;  
}  
  
//function definition  
