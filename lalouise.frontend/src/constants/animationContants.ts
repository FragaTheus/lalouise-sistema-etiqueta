//Pagina Login
export const logoDownAnimation = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay: 2.1  },
};

export const formInputLeftAnimation = (index?: number) => ({
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.4, delay: index? index * 0.7 : 0.3 },
})

export const fadeInUpAnimation = {
  initial:{ opacity: 0, y: 30 },
  animate:{ opacity: 1, y: 0 },
  transition:{ duration: 0.4, delay: 2.1 }
}

export const fadeInUpAnimationFooter = {
  initial:{ opacity: 0, y: 30 },
  animate:{ opacity: 1, y: 0 },
  transition:{ duration: 0.4, delay: 2.1 }
}


//NavList do Drawer
export const navListAnimation = (index: number) => ({
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.4, delay: index * 0.1 },
});
