interface MainConfig {
  title: string;
  modal: {
    title: string;
    bonus: string;
    button: string;
  };
}

export const mainConfig: MainConfig = {
  title: 'Plinko',
  modal: {
    title: 'You win',
    bonus: '100',
    button: 'Play again'
  }
}