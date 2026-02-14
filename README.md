<p align="center">
  <img src="./img.png" alt="Project Banner" width="100%">
</p>

# Cloth Matching & Outfit Tracker 🎯

## Basic Details

### Team Name: Gurlz

### Team Members
- Member 1: lulufidha - pptm college cherur  
- Member 2: sana sherin - pptm college cherur  

### Hosted Project Link  
https://lulufidha97-bit.github.io/tink-her-hack-temp/

### Project Description  
Cloth Matching & Outfit Tracker is a smart fashion assistant web application that helps users digitize their wardrobe, mix and categorize clothes, and generate outfit suggestions based on available items. It simplifies daily outfit planning and reduces repetition.

### The Problem Statement  
Many people struggle daily with deciding what to wear. They forget what clothes they own, find it difficult to match outfits properly, and often end up repeating the same combinations.

### The Solution  
This web app digitizes the user's wardrobe and provides smart, randomized outfit suggestions. It allows users to upload clothes, save favorite combinations, and track previously suggested outfits — making outfit planning easier and more efficient.

---

## Technical Details

### Technologies/Components Used

**For Software:**
- Languages used: HTML5, CSS3, JavaScript (ES6+)
- Frameworks used: None (Vanilla JavaScript)
- Libraries used: None
- Tools used: VS Code, Git, GitHub, GitHub Pages
- Storage: Browser LocalStorage (for data persistence)

**For Hardware:**
- Not Applicable (Software-only project)

---

## Features

- **Digital Wardrobe:** Add and categorize clothes (Tops, Bottoms, Shoes) with images.
- **Outfit Generator:** Randomly generates matching Top and Bottom combinations.
- **Favorites System:** Save favorite generated outfits for quick access.
- **Outfit History:** Conceptual tracking of daily outfit suggestions.
- **Responsive Design:** Works smoothly on mobile and desktop devices.
- **Local Data Storage:** Saves wardrobe and preferences using browser LocalStorage.

---

## Implementation

### For Software:

#### Installation
```bash
git clone https://github.com/lulufidha97-bit/tink-her-hack-temp.git
cd tink-her-hack-temp
```

#### Run
```bash
# Option 1: Open directly
Open index.html in your browser

# Option 2: Use Python local server
python -m http.server

# Option 3: Use live-server
live-server .
```

### For Hardware:
Not Applicable

---

## Project Documentation

### For Software:

#### Screenshots

![Home Screen](https://github.com/user-attachments/assets/c3479d91-beb5-495b-9d5d-e595d44c910d)  
*Home Screen: View your daily outfit suggestion and navigate to other features.*

![My Closet](https://github.com/user-attachments/assets/05e734c5-920a-4b6d-b7e8-7d7040846624)  
*My Closet: View and manage all your uploaded clothes.*

![Add Clothes](https://github.com/user-attachments/assets/16d84193-49c8-41bb-8c61-71f6c97455eb)  
*Add Clothes: Upload new items to your digital wardrobe.*

---

#### Diagrams

**System Architecture:**

![Architecture Diagram](docs/architecture.png)  
*The system runs entirely in the browser. User inputs (adding clothes) are stored in LocalStorage. The JavaScript logic processes stored data and generates outfit combinations dynamically.*

**Application Workflow:**

![Workflow](docs/workflow.png)  
*User adds clothes → Data stored in LocalStorage → User generates outfit → Random matching algorithm selects items → User can save to favorites.*

---

## Project Demo

### Video
[Add your demo video link here]

*The demo video showcases adding clothes, generating outfit suggestions, saving favorites, and navigating through the responsive interface.*

### Additional Demos
Live Site:  
https://lulufidha97-bit.github.io/tink-her-hack-temp/

---

## AI Tools Used (Optional - For Transparency Bonus)

**Tool Used:** ChatGPT  

**Purpose:**  
- UI logic suggestions  
- Debugging JavaScript issues  
- Improving documentation structure  

**Key Prompts Used:**
- "Generate random outfit matching logic in JavaScript"
- "Improve README formatting for hackathon submission"
- "Fix LocalStorage integration issue"

**Percentage of AI-generated code:** Approximately 15–20%

**Human Contributions:**
- Complete UI design and styling  
- Application logic implementation  
- Integration and testing  
- Project documentation  

---

## Team Contributions

- **lulufidha:** Frontend development (HTML structure, JavaScript logic), integration, project management.
- **sana sherin:** UI/UX design (CSS styling, animations), testing, documentation.

---

## License

This project is licensed under the MIT License – see the LICENSE file for details.

---

Made with ❤️ at TinkerHub
