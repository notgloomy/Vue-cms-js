export default {
  mounted(el) {
    const value = Number(el.textContent)
    if (typeof value === 'number') {
      el.textContent = value.toLocaleString()
    } else {
      console.warn('Binding value is not a valid number:', el.textContent)
    }
  }
}
