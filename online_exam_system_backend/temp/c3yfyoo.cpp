#include<stdio.h> 
#include<stdio.h>
int main(){
    int n;
    scanf("%d", &n);
    int i, c=0, a[n];
    int check(int x){
        int i, count =0;
        if(x ==1){
            return 0;
        }
        for(i=1;i<=x; i++){
            if(x%i  == 0){
                count++;
            }
        }
        if(count>2){
            return 0;
        }
        return 1;
    }
    for(i=0;i<n;i++){
        
        scanf("%d ",&a[i]);
        if(check(a[i])){
            c++;
        }
      printf("%d ",a[i]);
    }
    printf("\n%d\n",c);
    int j;
     for(j=0;j<n;j++){
        
     if(check(a[j])){
           printf("%d ", a[j]);
     }
     
    }
    return 0;
}
int main() { 
printf("%d", add(-5, 1));
return 0;  
}  
