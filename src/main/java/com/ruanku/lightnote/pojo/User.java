package com.ruanku.lightnote.pojo;

public class User {

	private Integer id;
	private String username;
	private String password;
	private String email;
	
	private long totalspace;
	private long usedspace;
	private long contribution;
	private String invitecode;
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public long getTotalspace() {
		return totalspace;
	}
	public void setTotalspace(long totalspace) {
		this.totalspace = totalspace;
	}
	public long getUsedspace() {
		return usedspace;
	}
	public void setUsedspace(long usedspace) {
		this.usedspace = usedspace;
	}
	public long getContribution() {
		return contribution;
	}
	public void setContribution(long contribution) {
		this.contribution = contribution;
	}
	public String getInvitecode() {
		return invitecode;
	}
	public void setInvitecode(String invitecode) {
		this.invitecode = invitecode;
	}
	@Override
	public String toString() {
		return "User [id=" + id + ", username=" + username + ", password=" + password + ", email=" + email
				+ ", totalspace=" + totalspace + ", usedspace=" + usedspace + ", contribution=" + contribution
				+ ", invitecode=" + invitecode + "]";
	}
	
	
	
	
}
