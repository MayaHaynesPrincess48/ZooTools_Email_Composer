export interface ContactItem {
    avatar: any;
    email: string;
}

export interface TagItemType {
    color: string; // Use 'string' type for image paths
    tagName: string;
    bgGradient: string;
  }
  
  export interface AllContactItem {
    title: string;
    member: number;
  }
  
  export interface DropdownListProps {
    $isVisible: boolean;
  }
  