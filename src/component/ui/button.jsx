function Button ({
  children,
  variant = 'primary',
  className = '',
  type ='Button',
  ...buttonProps
}) {
  const classes = `button button--${variant} ${className}`.trim()

  return (
    <button type = {type} className = {classes} {...buttonProps}>
    {children}
    </button>
  )
}

export default Button