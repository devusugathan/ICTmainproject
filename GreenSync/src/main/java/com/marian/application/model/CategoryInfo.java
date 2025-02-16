package com.marian.application.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
@Entity
public class CategoryInfo {
	 private String categoryName;

		@Id
		@GeneratedValue(strategy=GenerationType.IDENTITY)
		
		private int categoryId;

		CategoryInfo() {
			super();
			// TODO Auto-generated constructor stub
		}

		CategoryInfo(String categoryName, int categoryId) {
			super();
			this.categoryName = categoryName;
			this.categoryId = categoryId;
		}

		@Override
		public String toString() {
			return "CategoryInfo [categoryName=" + categoryName + ", categoryId=" + categoryId + "]";
		}

		public String getCategoryName() {
			return categoryName;
		}

		public void setCategoryName(String categoryName) {
			this.categoryName = categoryName;
		}

		public int getCategoryId() {
			return categoryId;
		}

		public void setCategoryId(int categoryId) {
			this.categoryId = categoryId;
		}
		
}
