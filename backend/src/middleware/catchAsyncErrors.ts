module.exports = (theFunc: (arg0: any, arg1: any, arg2: any) => any) => (req: any, res: any, next: any) => {
  Promise.resolve(theFunc(req, res, next)).catch(next);
};
