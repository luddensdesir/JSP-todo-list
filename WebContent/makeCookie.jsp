<%@ page import="java.util.Map" %>

<html>
	<body>
		<%
			Map<String, String[]> list = request.getParameterMap();
			String toDoList = "";

	        for (Map.Entry<String,String[]> entry : list.entrySet()){
	        	toDoList = entry.getKey();
	        }
	        
		    Cookie cookie = new Cookie("savedItems", toDoList );
		    response.addCookie(cookie);
		%>
		<%= list %>
 	</body>
</html>