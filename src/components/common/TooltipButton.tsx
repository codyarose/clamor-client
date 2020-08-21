import React, { FC } from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'

interface Props {
	title: string
	onClick?: () => void
	className?: string
	placement?:
		| 'bottom-end'
		| 'bottom-start'
		| 'bottom'
		| 'left-end'
		| 'left-start'
		| 'left'
		| 'right-end'
		| 'right-start'
		| 'right'
		| 'top-end'
		| 'top-start'
		| 'top'
}

const TooltipButton: FC<Props> = ({
	onClick,
	title,
	children,
	placement = 'bottom',
	className,
}) => (
	<Tooltip title={title} placement={placement} className={className}>
		<IconButton onClick={onClick} color="inherit">
			{children}
		</IconButton>
	</Tooltip>
)

export default TooltipButton
