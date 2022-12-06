export default function mess (){
  console.log('Hi from the default export!');
};
  
  // Named export `doStuff`
export const doStuff = () => {
  console.log('Doing stuff…');
};
  // Named export `doStuff`
export const DontdoStuff = () => {
  console.log('Not Doing stuff…');
};