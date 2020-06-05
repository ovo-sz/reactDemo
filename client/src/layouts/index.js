import Template from '@/components/Template'
function BasicLayout(props) {
  if (props.location.pathname === "/login") {
    //登录页
    return props.children;
  }
  else { //不是登录页界面的时候 才显示通用全局组件
    return (
      <Template >
        {props.children}
      </Template>
    );
  }
}
export default BasicLayout;
