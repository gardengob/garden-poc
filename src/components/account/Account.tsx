import { useState, useEffect } from "react"
import { supabase } from "../../utils/supabaseClient"
import Avatar from "../avatar/Avatar"

export default function Account({ session }) {
	const [loading, setLoading] = useState(true)
	const [user, setUser] = useState(null)
	const [username, setUsername] = useState(null)
	const [avatar_url, setAvatarUrl] = useState(null)

	useEffect(() => {
		getProfile()
		getUserFamilies()
	}, [session])

	async function getProfile() {
		try {
			setLoading(true)
			const user = supabase.auth.user()

			let { data, error, status } = await supabase
				.from("user")
				.select(`username, avatar_url`)
				.eq("id", user.id)
				.single()

			if (error && status !== 406) {
				throw error
			}

			if (data) {
				setUser(data)
				setUsername(data.username)
				setAvatarUrl(data.avatar_url)
			}
		} catch (error) {
			alert(error.message)
		} finally {
			setLoading(false)
		}
	}

	async function getFamilies() {
		try {
			setLoading(true)

			let { data, error, status } = await supabase
				.from("family")
				.select(`name`)

			if (error && status !== 406) {
				throw error
			}

			if (data) {
				console.log(data)
			}
		} catch (error) {
			alert(error.message)
		} finally {
			setLoading(false)
		}
	}

	async function getUserFamilies() {
		try {
			setLoading(true)

			const user = supabase.auth.user()

			let { data, error, status } = await supabase
				.from("user_family")
				.select(`family:family_id (name)`)
				.eq("user_id", user.id)

			if (error && status !== 406) {
				throw error
			}

			if (data) {
				console.log(data)
			}
		} catch (error) {
			alert(error.message)
		} finally {
			setLoading(false)
		}
	}

	async function updateProfile({ username, avatar_url }) {
		try {
			setLoading(true)
			const user = supabase.auth.user()

			const updates = {
				id: user.id,
				username,
				avatar_url,
				updated_at: new Date(),
			}

			let { error } = await supabase.from("user").upsert(updates, {
				returning: "minimal", // Don't return the value after inserting
			})

			if (error) {
				throw error
			}
		} catch (error) {
			alert(error.message)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="form-widget">
			<Avatar
				url={avatar_url}
				size={150}
				onUpload={(url) => {
					setAvatarUrl(url)
					updateProfile({ username, avatar_url: url })
				}}
			/>
			<div>
				<label htmlFor="email">Email</label>
				<input id="email" type="text" value={session.user.email} disabled />
			</div>
			<div>
				<label htmlFor="username">Name</label>
				<input
					id="username"
					type="text"
					value={username || ""}
					onChange={(e) => setUsername(e.target.value)}
				/>
			</div>

			<div>
				<button
					className="button block primary"
					onClick={() => updateProfile({ username, avatar_url })}
					disabled={loading}
				>
					{loading ? "Loading ..." : "Update"}
				</button>
			</div>

			<div>
				<button
					className="button block"
					onClick={() => supabase.auth.signOut()}
				>
					Sign Out
				</button>
			</div>
		</div>
	)
}
