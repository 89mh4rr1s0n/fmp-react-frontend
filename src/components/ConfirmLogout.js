import React, { useState } from 'react'
import { useAuth } from "../contexts/AuthContext"

export default function ConfirmLogout() {

    const { logout } = useAuth()
    const [setError] = useState("")

    async function handleLogout() {
        setError("")
    
        try {
          await logout()
        } catch {
          setError("Failed to log out")
        }
      }

    return (<>
        <button type="button" class="btn btn-light " data-toggle="modal" data-target="#myModal">
          Logout
        </button>

        <div class="modal" id="myModal" style={{marginTop: "70px"}}>
          <div class="modal-dialog">
            <div class="modal-content pb-4">
              <div class="modal-header" style={{paddingBottom: "0"}}>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
              </div>

              <h4 class="modal-body" style={{textAlign: "center"}}>
              Are you sure you wish to Logout?
              </h4>

              <div class="modal-footer" style={{margin: "0 auto"}}>
              <button type="button" class="btn btn-primary mx-4" data-dismiss="modal" onClick={handleLogout}>Yes</button>
                <button type="button" class="btn btn-danger mx-4" data-dismiss="modal">No</button>
              </div>

            </div>
          </div>
        </div>
        </>
    )
}
