import subprocess
import os

def restore_from_commit(commit, mappings):
    for old_prefix, new_prefix in mappings.items():
        print(f"⏳ Restoring {old_prefix} -> {new_prefix} from commit {commit}...")
        try:
            # Get list of files under old_prefix in the specific commit
            result = subprocess.check_output(
                ["git", "ls-tree", "-r", "--name-only", commit, old_prefix],
                text=True
            )
            files = result.splitlines()
            
            for file_path in files:
                # Calculate the relative path from the old_prefix
                rel_path = os.path.relpath(file_path, old_prefix)
                dest_path = os.path.join(new_prefix, rel_path)
                
                # Ensure the destination directory exists
                os.makedirs(os.path.dirname(dest_path), exist_ok=True)
                
                # Fetch file content from the commit
                content = subprocess.check_output(
                    ["git", "show", f"{commit}:{file_path}"]
                )
                
                # Write to destination
                with open(dest_path, "wb") as f:
                    f.write(content)
                # print(f"  ✅ {rel_path}")
                
        except subprocess.CalledProcessError as e:
            print(f"  ❌ Error processing {old_prefix}: {e}")

if __name__ == "__main__":
    commit_hash = "3eed0fb"
    # Mapping based on the analysis of 3eed0fb structure
    content_map = {
        "docs/data/items/qa/": "docs/content/zh/qa/",
        "docs/data/items-en/qa/": "docs/content/en/qa/",
        "docs/data/items/glossary/": "docs/content/zh/glossary/",
        "docs/data/items-en/glossary/": "docs/content/en/glossary/"
    }
    
    # Optional: Backup docs/content first? 
    # The user wants to rollback, so overwriting is the goal.
    
    restore_from_commit(commit_hash, content_map)
    print("\n✨ Restoration complete.")
