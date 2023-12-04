using Connect4m_Web.Models.LMSproperties;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Connect4m_Web.Models.LMSproperties
{
    public class RoleProp
    {
        public int InstanceRoleId { get; set; }
        public int InstanceId { get; set; }

        [Display(Name = "Role Name")]
        [Required]
        public string RoleName { get; set; }
        [Display(Name = "Role Description")]
        //  [Required]
        public string RoleDescirption { get; set; }
        [Display(Name = "Folder Size")]
        [Required]
        public string FolderSize { get; set; }
        [Display(Name = "Booking Limit")]
        [Required]

        public string BookingLimit { get; set; }
        [Required]
        [Display(Name = "Authorized Menu Items ")]
        public string MenuItems { get; set; }

        public int IsActive { get; set; }
        public int CreatedBy { get; set; }
        public List<int> AuthMenuIds { get; set; }

    }
    public class RoleMenu : Instance
    {
        public string InstanceMenuId { get; set; }
        [Display(Name = "Menu Name")]
        public string Menuname { get; set; }
        public string ParentMenuId { get; set; }
        public string Description { get; set; }
        public int IsHomePage { get; set; }
        public int Ischecked { get; set; }
        //public int InstanceId { get; set; }
        public string RoleMenuId { get; set; }
        public string DisplayName { get; set; }
        public string RoleWiseDisplayOrder { get; set; }
        public List<int> MenuId { get; set; }
        public List<int> DisplayOrderList { get; set; }
        public List<string> DisplayNameList { get; set; }

        //  public List<int> AuthMenuIds { get; set; }



    }
    public class ParentRoleMenu
    {
        public List<RoleProp> FirstTable { get; set; }
        public List<RoleMenu> Secondtable { get; set; }

    }
    public class AftercreteRole
    {
        public int InstanceId { get; set; }
        public string Roleid { get; set; }
        public string MenuId { get; set; }
    }
}
