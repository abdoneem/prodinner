﻿<%@ Page Language="C#" MasterPageFile="Template.Master" Inherits="System.Web.Mvc.ViewPage" %>

<asp:Content ID="Content1" ContentPlaceHolderID="Data" runat="server">

    <%= Html.AjaxDropdown(ViewData.TemplateInfo.GetFullHtmlFieldName(""), ViewData.TemplateInfo.FormattedModelValue) %>

</asp:Content>