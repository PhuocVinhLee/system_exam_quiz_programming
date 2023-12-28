#include<stdio.h>  
  
int add(int x, int y)  
{  
    return(x+y);  
}  
  
int main()  
{  
    int a1, b;  
  
 
    scanf("%d%d", &a, &b);  
  
    //function call add(a, b);  
    printf("%d",add(a, b));  
  
    return 0;  
}  
  
//function definition  