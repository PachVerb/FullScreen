//我将这个代码作为外部js导出了，如果你没有那么多模块，就直接CTRL +cv  这个方法，丢到你的
//vue代码  methods中就可以用了 
export const numberFilter = function (value,cut = 2) {
  //value为我们传进来的数据 比如  145775.422346
  //cut 为需要保留的小数位数  -1为清空小数 0为保留全部位数的小数 传入多少即为多少 不传默认保留两位小数 传进来多少就截取多少
  //数据校验  
  if (parseFloat(value).toString() == 'NaN') return '0.00'
  // 将数值截取
  let num = value.toString().split('.')
  let zs = num[0]
  let xs = num[1]
  // 整数部分处理，增加,
  const intPartFormat = zs.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
  if (xs != null) {
    if(cut == 0){
      return intPartFormat + '.' + xs
    }else if(cut == -1){
      return intPartFormat
    }else{
      return intPartFormat +'.' + xs.substr(0,cut)
    }
  } else {
    return intPartFormat
  }
}
