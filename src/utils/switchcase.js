import executeIfFunction from 'utils/executeIfFunction';

const switchcase = cases => defaultCase => key => (key in cases ? cases[key] : defaultCase);

const switchcaseF = cases => defaultCase => key =>
  executeIfFunction(switchcase(cases)(defaultCase)(key));

export default switchcaseF;
