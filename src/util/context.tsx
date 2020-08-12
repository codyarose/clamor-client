import React, { FC, createContext, useContext, useState } from 'react'

interface Context {
	authed: boolean
	updateAuthed: (value: boolean) => void
}

export const AppContext = createContext<Partial<Context>>({
	authed: false,
})

export const AppProvider: FC = ({ children }) => {
	const [authed, setAuthed] = useState(false)

	return (
		<AppContext.Provider
			value={{
				authed,
				updateAuthed: (value: boolean) => setAuthed(value),
			}}
		>
			{children}
		</AppContext.Provider>
	)
}

export const useAppValue = () => useContext(AppContext)
