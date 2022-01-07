import React, { useState } from 'react'
import { useAuth } from "../contexts/AuthContext"

export default function ConfirmLogout() {

    const { logout } = useAuth()
    // eslint-disable-next-line
    const [error, setError] = useState("")

    async function handleLogout() {
        setError("")
    
        try {
          await logout()
        } catch {
          setError("Failed to log out")
        }
      }

    return (<>
        <button type="button" className="btn btn-light " data-toggle="modal" data-target="#myModal">
          Logout
        </button>

        <div className="modal" id="myModal" style={{marginTop: "70px"}}>
          <div className="modal-dialog">
            <div className="modal-content pb-4">
              <div className="modal-header" style={{paddingBottom: "0"}}>
                <button type="button" className="close" data-dismiss="modal">&times;</button>
              </div>

              <h4 className="modal-body" style={{textAlign: "center"}}>
              Are you sure you wish to Logout?
              </h4>

              <div className="modal-footer" style={{margin: "0 auto"}}>
              <button type="button" className="btn btn-primary mx-4" data-dismiss="modal" onClick={handleLogout}>Yes</button>
                <button type="button" className="btn btn-danger mx-4" data-dismiss="modal">No</button>
              </div>

            </div>
          </div>
        </div>
        </>
    )
}
