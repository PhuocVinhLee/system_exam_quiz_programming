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
    printf("%ds",add(a, b));  
  
    return 0;  
}  
  
//function definition  